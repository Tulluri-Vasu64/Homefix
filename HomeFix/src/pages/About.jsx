import "../styles/About.css";

function About() {
  return (
    <section className="about-page">
      <div className="about-content">
        <h1>About HomeFix</h1>

        <p>
          HomeFix is a home maintenance service platform
          designed to help customers easily find and book
          professional home services.
        </p>

        <p>
          We provide plumbing, electrical, cleaning,
          painting, AC repair and appliance repair services.
        </p>

        <div className="about-boxes">
          <div>
            <h3>Trusted Professionals</h3>
            <p>Experienced service professionals.</p>
          </div>

          <div>
            <h3>Easy Booking</h3>
            <p>Book services from anywhere.</p>
          </div>

          <div>
            <h3>Affordable Prices</h3>
            <p>Transparent service pricing.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;