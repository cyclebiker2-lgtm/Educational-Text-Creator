# IBIS Text Generator v0.2

Standalone ESL reading-text generator with IBIS prompt controls, direct AI generation through a secure Vercel function, editable output, and browser-generated Word (.docx) export.

## Deploy on Vercel

1. Put the contents of this folder in its own GitHub repository (or a dedicated folder in an existing repository).
2. Connect that repository to Vercel.
3. Add the Vercel environment variable `OPENAI_API_KEY` with your OpenAI API key.
4. Optional: add `OPENAI_MODEL` to choose a different model. Default is `gpt-6-sol`.
5. Deploy. The browser calls `/api/generate-text`; the API key never appears in the HTML.

## Important

Do not put an OpenAI API key into the HTML or JavaScript. Keep it as a Vercel environment variable.

## Word export

The page loads the `docx` browser library from jsDelivr. The `.docx` is created locally in the browser from the edited text; Microsoft Word is not required.

## Local preview

The interface can be opened as a normal HTML file for prompt-building and Word-export testing. Direct AI generation requires the deployed `/api/generate-text` endpoint (or a configured endpoint in the UI).
