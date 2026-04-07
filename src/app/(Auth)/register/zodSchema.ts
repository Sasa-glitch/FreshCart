import * as z from "zod";
// zod validation schema
export const zodSchemia = z
    .object({
        name: z
            .string("Name has to be a text.")
            .nonempty("Name is required.")
            .min(3, "Enter at least 3 characters.")
            .max(13, "Enter 13 characters maximum."),
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
        rePassword: z.string().nonempty("Confirmation password is required"),
        phone: z
            .string()
            .nonempty("Phone is required.")
            .regex(
                /^(\+2)?01[1,2,0,5][0-9]{8}$/,
                "Phone has to be Egyptain number.",
            ),
    })
    .refine(
        (value) => {
            if (value.password !== value.rePassword) {
                return false;
            } else {
                return true;
            }
        },
        { error: "Passwords has to match", path: ["rePassword"] },
    );

export type RegisterDataType = z.infer<typeof zodSchemia>