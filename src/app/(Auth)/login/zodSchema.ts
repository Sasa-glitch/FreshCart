import * as z from "zod";
// zod validation schema
export const zodSchemia = z
    .object({
        email: z
            .email("Please enter a correct email")
            .nonempty("Email is required."),
        password: z
            .string()
            .min(8, "Your password must be at least 8 characters long.")
            .max(16, "Your password can be maximum 16 characters long.")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
                "Your password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (e.g., !@#$%).",
            ),
    })

export type LoginDataType = z.infer<typeof zodSchemia>