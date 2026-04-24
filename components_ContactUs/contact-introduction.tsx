export default function ContactIntroduction() {
  return (
    <section
      style={{ backgroundColor: "var(--color-page-bg)" }}
      className="w-full pt-16 pb-4 px-6"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h1
          id="contact-heading"
          className="text-2xl md:text-3xl font-extrabold italic uppercase tracking-wide"
          style={{
            color: "var(--color-orange)",
            fontFamily: "var(--font-playfair)",
          }}
        >
          Please reach out to us with any questions, suggestions, or issues!
        </h1>
      </div>
    </section>
  );
}
