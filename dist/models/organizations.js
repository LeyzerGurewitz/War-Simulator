"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EOrganization = void 0;
const mongoose_1 = require("mongoose");
var EOrganization;
(function (EOrganization) {
    EOrganization["IDF_North"] = "IDF - North";
    EOrganization["IDF_South"] = "IDF - South";
    EOrganization["IDF_Center"] = "IDF - Center";
    EOrganization["IDF_West_Bank"] = "IDF - West Bank";
    EOrganization["Hezbollah"] = "Hezbollah";
    EOrganization["Hamas"] = "Hamas";
    EOrganization["IRGC"] = "IRGC";
    EOrganization["Houthis"] = "Houthis";
})(EOrganization || (exports.EOrganization = EOrganization = {}));
;
const OrganizationSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    resources: [
        {
            missile: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Missile',
                required: true
            },
            amount: {
                type: Number,
                required: true
            }
        }
    ],
    budget: {
        type: Number,
        required: true
    }
});
exports.default = (0, mongoose_1.model)('Organization', OrganizationSchema);
