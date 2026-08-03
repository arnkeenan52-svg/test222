// Renders a JSON-LD structured-data block. The "<" escape prevents any string in
// the data from breaking out of the <script> tag (defense-in-depth; our data is
// static). Structured data is how Google builds rich results and how AI answer
// engines reliably parse what the page and product are.
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
