/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const FilterUtils = require('../../MapStore2/web/client/utils/FilterUtils');

const BaseFilter = '<?xml version="1.0" encoding="UTF-8"?><wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">' +
                '<ows:Identifier>gs:PagedUnique</ows:Identifier>' +
                  '<wps:DataInputs>' +
                    '<wps:Input>' +
                      '<ows:Identifier>features</ows:Identifier>' +
                      '<wps:Reference mimeType="application/json subtype=wfs-collection/1.0" xlink:href="http://geoserver/wfs?request=GetFeature&amp;version=1.0.0&amp;typeName=${typeName}&amp;CQL_FILTER=${cqlFilter}" method="GET"/> ' +
                    '</wps:Input>' +
                    '<wps:Input>' +
                      '<ows:Identifier>fieldName</ows:Identifier>' +
                      '<wps:Data>' +
                        '<wps:LiteralData>${attribute}</wps:LiteralData>' +
                      '</wps:Data>' +
                    '</wps:Input>' +
                  '</wps:DataInputs>' +
                  '<wps:ResponseForm>' +
                    '<wps:RawDataOutput mimeType="application/json">' +
                      '<ows:Identifier>result</ows:Identifier>' +
                    '</wps:RawDataOutput>' +
                  '</wps:ResponseForm>' +
                '</wps:Execute>';

const LhtacFilterUtils = {
    propertyTagReference: {
        "1.0.0": {startTag: "<PropertyName>", endTag: "</PropertyName>"},
        "1.1.0": {startTag: "<PropertyName>", endTag: "</PropertyName>"},
        "2.0": {startTag: "<ValueReference>", endTag: "</ValueReference>"}
    },
    ogcSpatialOperator: {
        "INTERSECTS": {startTag: "<Intersects>", endTag: "</Intersects>"},
        "BBOX": {startTag: "<BBOX>", endTag: "</BBOX>"},
        "CONTAINS": {startTag: "<Contains>", endTag: "</Contains>"},
        "DWITHIN": {startTag: "<DWithin>", endTag: "</DWithin>"},
        "WITHIN": {startTag: "<Within>", endTag: "</Within>"}
    },
    ogcLogicalOperator: {
        "OR": {startTag: "<Or>", endTag: "</Or>"}
    },
    getWpsRequest(typeName, cqlFilter, attribute) {
        let cql = encodeURI(cqlFilter);
        let filter = BaseFilter.replace("${typeName}", typeName);
        filter = filter.replace("${cqlFilter}", cql);
        filter = filter.replace("${attribute}", attribute);
        return filter;

    },
    getZoneCrossFilter(spatialField) {
        let zone;
        // Get the latest zone with value in the array
        for (let i = spatialField.zoneFields.length - 1; i >= 0; i--) {
            if (spatialField.zoneFields[i].value) {
                zone = spatialField.zoneFields[i];
                break;
            }
        }

        // Get the attribute name (check for dotted notation)
        let attribute = zone.valueField.indexOf(".") !== -1 ? zone.valueField.split('.')[zone.valueField.split('.').length - 1] : zone.valueField;

        // Prepare the cql cross layer filter
        let filter = spatialField.operation +
            "(" + spatialField.attribute +
                ", collectGeometries(queryCollection('" +
                    zone.typeName +
                    "', '" + zone.geometryName +
                    "', '" + attribute;

        if (zone.value instanceof Array) {
            filter += " IN (";
            zone.value.forEach((value, index) => {
                filter += "''" + value + "''";
                if (index < zone.value.length - 1) {
                    filter += ",";
                }
            });
            filter += ")')))";
        } else {
            filter += " = ''" + zone.value + "''')))";
        }
        return filter;
    },
    processOGCSpatialFilter: function(json, version) {
        let objFilter;
        try {
            objFilter = (json instanceof Object) ? json : JSON.parse(json);
        } catch(e) {
            return e;
        }

        let filter = '<Filter xmlns:gml="http://www.opengis.net/gml">';

        let ogc = this.ogcSpatialOperator[objFilter.spatialField.operation].startTag;
        ogc +=
            this.propertyTagReference[version].startTag +
                objFilter.spatialField.attribute +
            this.propertyTagReference[version].endTag;

        switch (objFilter.spatialField.operation) {
            case "INTERSECTS":
            case "DWITHIN":
            case "WITHIN":
            case "CONTAINS": {
                switch (objFilter.spatialField.geometry.type) {
                    case "Point":
                        ogc += FilterUtils.getGmlPointElement(objFilter.spatialField.geometry.coordinates,
                            objFilter.spatialField.geometry.projection || "EPSG:4326");
                        break;
                    case "MultiPoint":
                        ogc += '<gml:MultiPoint srsName="' + (objFilter.spatialField.geometry.projection || "EPSG:4326") + '">';

                        // //////////////////////////////////////////////////////////////////////////
                        // Coordinates of a MultiPoint are an array of positions
                        // //////////////////////////////////////////////////////////////////////////
                        objFilter.spatialField.geometry.coordinates.forEach((element) => {
                            let point = element;
                            if (point) {
                                ogc += "<gml:pointMember>";
                                ogc += FilterUtils.getGmlPointElement(point);
                                ogc += "</gml:pointMember>";
                            }
                        });

                        ogc += '</gml:MultiPoint>';
                        break;
                    case "Polygon":
                        ogc += FilterUtils.getGmlPolygonElement(objFilter.spatialField.geometry.coordinates,
                            objFilter.spatialField.geometry.projection || "EPSG:4326");
                        break;
                    case "MultiPolygon":
                        const multyPolygonTagName = version === "2.0" ? "MultiSurface" : "MultiPolygon";
                        const polygonMemberTagName = version === "2.0" ? "surfaceMembers" : "polygonMember";

                        ogc += '<gml:' + multyPolygonTagName + ' srsName="' + (objFilter.spatialField.geometry.projection || "EPSG:4326") + '">';

                        // //////////////////////////////////////////////////////////////////////////
                        // Coordinates of a MultiPolygon are an array of Polygon coordinate arrays
                        // //////////////////////////////////////////////////////////////////////////
                        objFilter.spatialField.geometry.coordinates.forEach((element) => {
                            let polygon = element;
                            if (polygon) {
                                ogc += "<gml:" + polygonMemberTagName + ">";
                                ogc += FilterUtils.getGmlPolygonElement(polygon);
                                ogc += "</gml:" + polygonMemberTagName + ">";
                            }
                        });

                        ogc += '</gml:' + multyPolygonTagName + '>';
                        break;
                    default:
                        break;
                }

                if (objFilter.spatialField.operation === "DWITHIN") {
                    ogc += '<Distance units="m">' + (objFilter.spatialField.geometry.distance || 0) + '</Distance>';
                }

                break;
            }
            case "BBOX": {
                let lowerCorner = objFilter.spatialField.geometry.extent[0] + " " + objFilter.spatialField.geometry.extent[1];
                let upperCorner = objFilter.spatialField.geometry.extent[2] + " " + objFilter.spatialField.geometry.extent[3];

                ogc +=
                    '<gml:Envelope' + ' srsName="' + objFilter.spatialField.geometry.projection + '">' +
                        '<gml:lowerCorner>' + lowerCorner + '</gml:lowerCorner>' +
                        '<gml:upperCorner>' + upperCorner + '</gml:upperCorner>' +
                    '</gml:Envelope>';

                break;
            }
            default:
                break;
        }

        ogc += this.ogcSpatialOperator[objFilter.spatialField.operation].endTag;

        filter += ogc;
        filter += '</Filter>';

        return filter;
    },
    // created from a list of features id
    processOGCIdFilter: function(features, attributeName, logicalOperator, version) {
        let filter = '<Filter>';

        let ogc = this.ogcLogicalOperator[logicalOperator].startTag;

        // building the list of options inside or operator
        features.forEach((element) => {
            if (element) {
                ogc += "<PropertyIsEqualTo>" +
                        this.propertyTagReference[version].startTag +
                        attributeName +
                        this.propertyTagReference[version].endTag;
                ogc += "<Literal>" +
                        element.properties[attributeName] +
                         "</Literal></PropertyIsEqualTo>";
            }
        });

        ogc += this.ogcLogicalOperator[logicalOperator].endTag;

        filter += ogc;
        filter += '</Filter>';

        return filter;
    }
};

module.exports = LhtacFilterUtils;
