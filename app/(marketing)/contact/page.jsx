import ContactForm from "./contact-form";

export const metadata = {
  description:
    "Contact TrainHub AI to report incorrect platform information, suggest new AI training platforms, discuss partnerships, or share feedback.",
  title: "Contact Us",
};

const contactTopics = [
  "📌 Report incorrect platform information",
  "💡 Suggest a new AI training platform",
  "🤝 Partnership & collaboration",
  "🛠️ Technical issues or feedback",
];

export default function ContactPage() {
  return (
    <main className="focus:outline-none" id="main-content" tabIndex={-1}>
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            
            <h1 className="font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              Contact Us
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              We'd love to hear from you. Whether you have a question, found
              incorrect information, want to suggest a new AI training platform,
              or have a partnership opportunity, we're here to help.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-white p-6 shadow-sm sm:p-8">
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h2 className="font-display text-3xl font-semibold text-foreground">
              What can you contact us about?
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactTopics.map((topic) => (
              <article
                className="rounded-lg border border-border bg-white p-5 text-sm font-semibold leading-6 text-foreground shadow-sm"
                key={topic}
              >
                {topic}
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-lg border border-blue-100 bg-blue-50 p-6">
            <h2 className="text-lg font-semibold text-foreground">
              Response Time
            </h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              We usually respond within 24-48 hours.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
