import React, { useEffect } from "react";
import { contactText } from "../constants";

const Contact = () => {
  useEffect(() => {
    const targets = document.querySelectorAll(".contact__motion");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const item = entry.target;
          if (entry.isIntersecting && !item.classList.contains("active")) {
            item.classList.add("active");
            // 한 번 활성화되면 더 이상 관찰 중지 (once 효과)
            // observer.unobserve(item);
          } else if (!entry.isIntersecting && item.classList.contains("active")) {
            item.classList.remove("active");
          }
        });

      },
      {
        threshold: 0.5, // 50% 이상 보여야 적용
      }
    );

    // 각각의 요소를 관찰 
    targets.forEach((el) => observer.observe(el));
    // if (target) observer.observe(target);
    return () => observer.disconnect();
  }, []);


  return (
    <section id="contact">
      <div className="contact__inner contact__motion">
        <h2 className="contact__title">연락 <em>Contact</em></h2>
        <div className="contact__wrap">
          <p className="contact__desc">제 포트폴리오를 봐주셔서 감사합니다.</p>
          <div className="contact__mail">
            {contactText.map((contact, key) => (
              <div key={key}>
                <a
                  href={contact.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {contact.title}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;