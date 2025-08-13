import { HttpStatusCode } from "@shared/enums/statusCodes/http-status-codes";

export const CHEF_SRC_ARRAY = [
  227920, 240413, 227924, 44252, 33158, 218334,
].map((n) => {
  return `https://www.svgrepo.com/show/${n}/chef.svg`;
});

export const CHEF_HTTP_STATUS_MESSAGES: Partial<
  Record<HttpStatusCode, string>
> = {
  [HttpStatusCode.DUPLICATE]: "Chef contain duplicate fields",
};
