import ContactForm from "../components/ContactForm";
import { Helmet } from "react-helmet";

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact Off Ramp | Book the Band</title>
        <meta
          name="description"
          content="Book us for your next event."
        />
      </Helmet>

      <main className="page">
        <h1>Contact Off Ramp</h1>
        <p>Want to book us for your event? Send us the details below.</p>
        <p>Available for events across West Georgia and Eastern Alabama.</p>

        <ContactForm />
      </main>
    </>
  );
}