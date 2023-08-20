const zod = require("zod");

const SP_Schema = zod.object({
  name: zod.string({
    invalid_type_error: "Character invalid",
    required_error: "Name is required",
  }),
  image: zod
    .string()
    .url()
    .refine(
      (url) => {
        return (
          url.endsWith(".png") || url.endsWith(".jpg") || url.endsWith(".webp")
        );
      },
      {
        message: "URL must end with .png, .jpg, or .webp",
      }
    ),
  //year:zod.number().int().positive().min(0).max(1202)
});

//retorna un objeto resolve si hay error o datos

function validateSP(object) {
  return SP_Schema.safeParse(object);
}

module.exports = {
  validateSP,
};
