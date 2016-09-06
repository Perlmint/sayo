/// <reference path="../../../typings/index.d.ts" />
import { model, primaryKey } from "typedsequelize";

@model
export class User {
	@primaryKey
	google_id: string;
	token: string;
	name: string;
}
