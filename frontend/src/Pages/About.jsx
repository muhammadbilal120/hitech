import OverPolicy from "../Components/OverPolicy";
import Title from "../Components/Title";
import { assets } from "../assets/assets";
const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div
          className="flex flex-col justify-center  gap-6 md:w-3/4 text-gray-600 p-5"
          style={{ background: "#f5f5f5" }}
        >
          <h2
            style={{
              textAlign: "start",
              fontSize: "60px",
              fontWeight: "400",
              color: "#666666",
            }}
          >
            WHY
            <span
              style={{
                fontSize: "90px",
                fontWeight: "700",
                color: "#89d3b8",
                display: "block",
                lineHeight: "1",
              }}
            >
              MUTE !
            </span>
          </h2>
          <h3
            style={{
              textAlign: "start",
              fontSize: "23px",
              lineHeight: "31px",
              fontWeight: 600,
            }}
          >
            Let your outfit speak📣
          </h3>
          <h5
            style={{
              marginBottom: "3px",
              fontSize: "16px",
              fontWeight: "700",
              textAlign: "start",
            }}
          >
            Welcome to Mute
          </h5>
          <hr style={{ color: "black", height: "2px" }} />
          <p style={{ textAlign: "start", marginTop: "24px" }}>
            Where silence speaks volumes. Our clothing brand is inspired by the
            quiet power of understated elegance and minimalist design. At Mute,
            we believe that true style doesn’t need to shout—it whispers. Our
            collections are carefully curated to embody smplicity,
            sophistication, and timeless appeal. Each piece is designed with
            clean lines, neutral palettes, and high-quality fabrics, allowing
            you to express your individuality without saying a word. Mute is
            more than a brand; it’s a movement towards mindful fashion. We
            prioritize sustainability, ethical production, and enduring quality.
            Our garments are crafted to last, with a focus on versatility and
            timeless style that transcends trends.
          </p>
          <h5 style={{ textAlign: "start", fontWeight: "600" }}>OUR ADDRESS</h5>
          <p style={{ textAlign: "start" }}>
            Street 26, Block C Faisal Town, Lahore, Punjab, Pakistan
          </p>
        </div>
      </div>
      <OverPolicy />
    </div>
  );
};

export default About;
