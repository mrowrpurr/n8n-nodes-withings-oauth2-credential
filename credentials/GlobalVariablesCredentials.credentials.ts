import { Icon, ICredentialType, INodeProperties } from "n8n-workflow"

export type FieldType = "boolean" | "number" | "json" | "secret" | "string"

export const GLOBAL_VARIABLES_INFO = {
	credentialsName: "globalVariablesApi",
	counts: {
		boolean: 0,
		number: 0,
		json: 10,
		secret: 0,
		string: 0,
	},
	prefixes: {
		boolean: "boolean",
		number: "number",
		json: "json",
		secret: "secret",
		string: "string",
	},
	getFieldName: (type: FieldType, index: number): string => {
		const prefix = GLOBAL_VARIABLES_INFO.prefixes[type]
		return `${prefix}${index}Name` as const
	},
}

// const booleanFields = Array.from({ length: GLOBAL_VARIABLES_INFO.counts.boolean }, (_, i) => {
// 	const index = i + 1
// 	return [
// 		{
// 			displayName: `Boolean ${index} Name`,
// 			name: GLOBAL_VARIABLES_INFO.getFieldName("boolean", index),
// 			type: "string" as const,
// 			default: "",
// 			placeholder: "varName",
// 		},
// 		{
// 			displayName: `Boolean ${index} Value`,
// 			name: GLOBAL_VARIABLES_INFO.getFieldName("boolean", index).replace("Name", "Value"),
// 			type: "boolean" as const,
// 			default: false,
// 		},
// 	]
// }).flat()

// const numberFields = Array.from({ length: GLOBAL_VARIABLES_INFO.counts.number }, (_, i) => {
// 	const index = i + 1
// 	return [
// 		{
// 			displayName: `Number ${index} Name`,
// 			name: GLOBAL_VARIABLES_INFO.getFieldName("number", index),
// 			type: "string" as const,
// 			default: "",
// 			placeholder: "varName",
// 		},
// 		{
// 			displayName: `Number ${index} Value`,
// 			name: GLOBAL_VARIABLES_INFO.getFieldName("number", index).replace("Name", "Value"),
// 			type: "number" as const,
// 			default: "0",
// 		},
// 	]
// }).flat()

const jsonFields = Array.from({ length: GLOBAL_VARIABLES_INFO.counts.json }, (_, i) => {
	const index = i + 1
	return [
		{
			displayName: `Variable Name`,
			name: GLOBAL_VARIABLES_INFO.getFieldName("json", index),
			type: "string" as const,
			default: "",
			placeholder: "varName",
		},
		{
			displayName: `Value`,
			name: GLOBAL_VARIABLES_INFO.getFieldName("json", index).replace("Name", "Value"),
			type: "json" as const,
			default: "{ }",
		},
	]
}).flat()

// const stringFields = Array.from({ length: GLOBAL_VARIABLES_INFO.counts.string }, (_, i) => {
// 	const index = i + 1
// 	return [
// 		{
// 			displayName: `Text ${index} Name`,
// 			name: GLOBAL_VARIABLES_INFO.getFieldName("string", index),
// 			type: "string" as const,
// 			default: "",
// 			placeholder: "varName",
// 		},
// 		{
// 			displayName: `Text ${index} Value`,
// 			name: GLOBAL_VARIABLES_INFO.getFieldName("string", index).replace("Name", "Value"),
// 			type: "string" as const,
// 			default: "",
// 			placeholder: "Enter value",
// 		},
// 	]
// }).flat()

// const secretFields = Array.from({ length: GLOBAL_VARIABLES_INFO.counts.secret }, (_, i) => {
// 	const index = i + 1
// 	return [
// 		{
// 			displayName: `Secret ${index} Name`,
// 			name: GLOBAL_VARIABLES_INFO.getFieldName("secret", index),
// 			type: "string" as const,
// 			default: "",
// 			placeholder: "varName",
// 		},
// 		{
// 			displayName: `Secret ${index} Value`,
// 			name: GLOBAL_VARIABLES_INFO.getFieldName("secret", index).replace("Name", "Value"),
// 			type: "string" as const,
// 			default: "",
// 			placeholder: "Enter secret",
// 			typeOptions: { password: true },
// 		},
// 	]
// }).flat()

// eslint-disable-next-line n8n-nodes-base/cred-class-name-unsuffixed
export class GlobalVariablesCredentials implements ICredentialType {
	name = GLOBAL_VARIABLES_INFO.credentialsName
	// eslint-disable-next-line n8n-nodes-base/cred-class-field-display-name-missing-api
	displayName = "Global Variables"
	description = "Global variables"
	icon: Icon = "fa:file-code"

	properties: INodeProperties[] = [
		// {
		// 	type: "notice",
		// 	displayName: `Boolean Variables`,
		// 	name: `booleanVariablesNotice`,
		// 	default: "",
		// },
		// ...booleanFields,

		// {
		// 	type: "notice",
		// 	displayName: `Number Variables`,
		// 	name: `numberVariablesNotice`,
		// 	default: "",
		// },
		// ...numberFields,

		{
			type: "notice",
			displayName: `ℹ️ Variables below are available in any workflow by using the Global Variables node.`,
			// displayName: `JSON Variables`,
			// name: `jsonVariablesNotice`,
			name: `globalVariablesNotice`,
			default: "",
		},
		...jsonFields,

		// {
		// 	type: "notice",
		// 	displayName: `Secret Variables`,
		// 	name: `secretVariablesNotice`,
		// 	default: "",
		// },
		// ...secretFields,

		// {
		// 	type: "notice",
		// 	displayName: `Text Variables`,
		// 	name: `textVariablesNotice`,
		// 	default: "",
		// },
		// ...stringFields,
	]
}

export interface GlobalVariablesCredentialsData {
	[key: `${"boolean" | "number" | "json" | "string" | "secret"}${number}${"Name" | "Value"}`]: string
}
