import { StatusCode } from "@shared/enums/status-codes";

export const CHEF_SRC_ARRAY = [
  227920, 240413, 227924, 44252, 33158, 218334,
].map((n) => {
  return `https://www.svgrepo.com/show/${n}/chef.svg`;
});

export const CHEF_HTTP_STATUS_MESSAGES: Partial<Record<StatusCode, string>> = {
  [StatusCode.DUPLICATE]: "Chef contain duplicate fields",
};
