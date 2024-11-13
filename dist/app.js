"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const db_1 = __importDefault(require("./config/db"));
const http_1 = __importDefault(require("http"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const organizations_1 = __importStar(require("./models/organizations"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const corsOptions = {
    origin: '*',
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
(0, db_1.default)();
const server = http_1.default.createServer(app);
app.use('/api', userRoutes_1.default);
// מסלול להוספת כל האירגונים למסד הנתונים
app.get('/api/addOrganizations', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const organizationsData = [
        {
            name: organizations_1.EOrganization.IDF_North,
            resources: [
                { missile: "6734925463ab31d583e39b1b", amount: 10 }, // Iron Dome
                { missile: "6734925463ab31d583e39b1c", amount: 5 } // David's Sling
            ],
            budget: 1000000
        },
        {
            name: organizations_1.EOrganization.IDF_South,
            resources: [
                { missile: "6734925463ab31d583e39b1b", amount: 8 }, // Iron Dome
                { missile: "6734925463ab31d583e39b1d", amount: 3 } // Patriot
            ],
            budget: 900000
        },
        {
            name: organizations_1.EOrganization.IDF_Center,
            resources: [
                { missile: "6734925463ab31d583e39b1e", amount: 7 }, // Arrow
                { missile: "6734925463ab31d583e39b1c", amount: 4 } // David's Sling
            ],
            budget: 1200000
        },
        {
            name: organizations_1.EOrganization.IDF_West_Bank,
            resources: [
                { missile: "6734925463ab31d583e39b1b", amount: 6 }, // Iron Dome
                { missile: "6734925463ab31d583e39b24", amount: 2 } // Fateh-110
            ],
            budget: 800000
        },
        {
            name: organizations_1.EOrganization.Hezbollah,
            resources: [
                { missile: "6734925463ab31d583e39b21", amount: 20 }, // Fajr-5
                { missile: "6734925463ab31d583e39b22", amount: 10 } // Zelzal-2
            ],
            budget: 500000
        },
        {
            name: organizations_1.EOrganization.Hamas,
            resources: [
                { missile: "6734925463ab31d583e39b1f", amount: 25 }, // Qassam
                { missile: "6734925463ab31d583e39b20", amount: 15 } // M-75
            ],
            budget: 300000
        },
        {
            name: organizations_1.EOrganization.IRGC,
            resources: [
                { missile: "6734925463ab31d583e39b23", amount: 5 }, // Shahab-3
                { missile: "6734925463ab31d583e39b24", amount: 3 } // Fateh-110
            ],
            budget: 1500000
        },
        {
            name: organizations_1.EOrganization.Houthis,
            resources: [
                { missile: "6734925463ab31d583e39b25", amount: 12 }, // Badr-1
                { missile: "6734925463ab31d583e39b26", amount: 10 } // Quds-1
            ],
            budget: 600000
        },
    ];
    try {
        for (const orgData of organizationsData) {
            const newOrganization = new organizations_1.default({
                name: orgData.name,
                resources: orgData.resources,
                budget: orgData.budget,
            });
            yield newOrganization.save();
        }
        res.status(200).json({ message: 'Organizations added successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to add organizations', details: error });
    }
}));
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
