import { z } from "zod";

// Definindo o schema esperado do output
const CEFRSchema = z.enum(["A1", "A2", "B1", "B2", "C1", "C2"]);

const LLMOutputSchema = z.object({
  errors_identified: z.array(z.string()),
  corrected_errors: z.array(z.string()).optional(),
  explanation_of_corrections: z.string(),
  cefr_level: z.object({
    level: CEFRSchema,
    justification: z.string(),
  }),
  gamified_suggestions: z.array(z.string()),
  perfect_subject: z.string(),
  perfect_body: z.string(),
  perfect_subject_explanation: z.string(),
  perfect_body_explanation: z.string(),
});

// Criando o tipo a partir do schema
type LLMOutput = z.infer<typeof LLMOutputSchema>;

// Função para sanitizar/validar
export function sanitizeOutput(raw: unknown): LLMOutput | null {
  const parsed = LLMOutputSchema.safeParse(raw);
  if (!parsed.success) {
    console.error("Output inválido:", parsed.error.format());
    return null;
  }
  return parsed.data;
}
