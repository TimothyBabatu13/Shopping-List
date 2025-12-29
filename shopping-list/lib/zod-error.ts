import { ZodError } from "zod"

export type ZodFieldErrors = Record<string, string[]>

export function parseZodError(error: unknown): ZodFieldErrors | null {
  if (!(error instanceof ZodError)) return null

  const fieldErrors: ZodFieldErrors = {}

  for (const issue of error.issues) {
    const fieldPath = issue.path.join(".") || "root"

    if (!fieldErrors[fieldPath]) {
      fieldErrors[fieldPath] = []
    }

    fieldErrors[fieldPath].push(issue.message)
  }

  return fieldErrors
}


export function formatZodErrorsForToast(
  errors: ZodFieldErrors
): string {
  return Object.entries(errors)
    .map(([field, messages]) => {
      const label =
        field === "root"
          ? "Error"
          : field.replace(/([A-Z])/g, " $1")

      return `${capitalize(label)}: ${messages.join(", ")}`
    })
    .join("\n")
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}