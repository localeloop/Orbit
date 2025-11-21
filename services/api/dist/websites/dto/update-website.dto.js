"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateWebsiteDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_website_dto_1 = require("./create-website.dto");
class UpdateWebsiteDto extends (0, mapped_types_1.PartialType)(create_website_dto_1.CreateWebsiteDto) {
}
exports.UpdateWebsiteDto = UpdateWebsiteDto;
//# sourceMappingURL=update-website.dto.js.map