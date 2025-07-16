import { signupUserService } from "../../services/user/user.signup.service";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import { signupUserValidator } from "../../validators/user/user.validator";

export class UserController {
  public static signupUser = asyncHandler(async (req, res, next) => {
    const body = signupUserValidator.parse(req.body);
    const user = await signupUserService(body);
    return res.status(201).send(new ApiResponse(200, user));
  });
}
