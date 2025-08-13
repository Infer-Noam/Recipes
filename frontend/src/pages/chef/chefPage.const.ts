export const CHEF_SRC_ARRAY = [
  227920, 240413, 227924, 44252, 33158, 218334,
].map((n) => {
  return `https://www.svgrepo.com/show/${n}/chef.svg`;
});

enum StatusCode {
  DUPLICATE_FIELD = 409,
}

export const HTTP_STATUS_MESSAGES: Record<number, string> = {
  [StatusCode.DUPLICATE_FIELD]: "Chef contain duplicate fields",
};
