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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Action = void 0;
const core = __importStar(require("@actions/core"));
const TagVersion_1 = require("./TagVersion");
const FindPreviousVersion_1 = require("./FindPreviousVersion");
class Action {
    constructor(inputs, tags) {
        this.inputs = inputs;
        this.tags = tags;
    }
    perform() {
        return __awaiter(this, void 0, void 0, function* () {
            const version = TagVersion_1.TagVersion.fromTag(this.inputs.tag);
            const allTags = yield this.tags.tags();
            const previousVersion = (0, FindPreviousVersion_1.findPreviousVersion)(version, allTags);
            this.outputVersionInfo(version);
            this.outputPreviousTag(previousVersion);
        });
    }
    outputVersionInfo(version) {
        core.setOutput('tag', version.tag);
        core.setOutput('major', version.version.major.toString());
        core.setOutput('minor', version.version.minor.toString());
        core.setOutput('patch', version.version.patch.toString());
        core.setOutput('micro_patch', version.version.microPatch.toString());
        core.setOutput('type', version.version.type.toString());
    }
    outputPreviousTag(previousVersion) {
        if (previousVersion) {
            core.setOutput('previous_tag', previousVersion.tag);
        }
    }
}
exports.Action = Action;
