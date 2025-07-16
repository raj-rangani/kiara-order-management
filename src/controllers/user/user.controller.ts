import { loginUserService } from "../../services/user/user.login.service";
import { signupUserService } from "../../services/user/user.signup.service";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import {
  loginUserValidator,
  signupUserValidator,
} from "../../validators/user/user.validator";

export class UserController {
  public static signupUser = asyncHandler(async (req, res, next) => {
    const body = signupUserValidator.parse(req.body);
    const user = await signupUserService(body);
    return res.status(201).send(new ApiResponse(200, user));
  });

  public static loginUser = asyncHandler(async (req, res, next) => {
    const body = loginUserValidator.parse(req.body);
    const token = await loginUserService(body);
    return res.status(200).send(new ApiResponse(200, token));
  });
}
