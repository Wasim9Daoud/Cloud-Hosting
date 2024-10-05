import { z } from "zod";

// crate article schema
export const createArticleSchema = z.object({
  title: z
    .string({
      required_error: "title is required",
      invalid_type_error: "title should be a string",
    })
    .min(3, "title must be at least 3 characters")
    .max(20, "title must be less than 20 characters"),
  decription: z
    .string({
      required_error: "description is required",
    })
    .min(20, "description must be at least 20 characters")
    .max(100, "description must be less than 100 characters"),
});

// register user schema
export const RegisterNewUserSchema = z.object({
  username: z
    .string({
      required_error: " username is required ",
      invalid_type_error: " username must be a string ",
    })
    .min(3, " username must be at least 3 characters ")
    .max(30, " username must be less than 30 characters "),
  email: z
    .string({
      required_error: " email is required ",
      invalid_type_error: " email must be a string ",
    })
    .email(),
  password: z
    .string({
      required_error: " password is required ",
      invalid_type_error: " password must be a string  ",
    })
    .min(8, " password must be at least 8 characters "),
});

// login user schema
export const loginUserSchema = z.object({
  email: z
    .string({
      required_error: " email is required ",
      invalid_type_error: " email must be a string ",
    })
    .email(),
  password: z
    .string({
      required_error: " password is required ",
      invalid_type_error: " password must be a string  ",
    })
    .min(8, " password must be at least 8 characters "),
});

// create comment schema
export const createCommentSchema = z.object({
  text: z
    .string({
      required_error: " comment is required ",
      invalid_type_error: " comment must be a string ",
    })
    .min(2, "comment must be at least tow characters")
    .max(200, "comment must be less than 200 characters"),
  articleId: z.number(),
});

// update comment schema
export const updateCommentSchema = z.object({
  text : z.string().min(3,'text should be at least 3 characters').max(100,'text should be less than 100 characters')
})

// update profile schema
export const updateProfileSchema = z.object({
  username: z
    .string({
      required_error: " username is required ",
      invalid_type_error: " username must be a string ",
    })
    .min(3, " username must be at least 3 characters ")
    .max(30, " username must be less than 30 characters ")
    .optional() ,
  email: z
    .string({
      required_error: " email is required ",
      invalid_type_error: " email must be a string ",
    })
    .email()
    .optional() ,
  password: z
    .string({
      required_error: " password is required ",
      invalid_type_error: " password must be a string  ",
    })
    .min(8, " password must be at least 8 characters ")
    .optional() 
});