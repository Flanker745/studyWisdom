import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

function FAQ() {
  const faqs = [
    {
      id: 1,
      question: "What is coaching and how can it benefit me ?",
      answer:
        "Coaching is a process that helps individuals identify and achieve their personal and professional goals. It can benefit you by increasing self-awareness, improving communication skills, and enhancing overall performance.",
    },
    {
      id: 2,
      question: "What is the difference between coaching and mentoring ?",
      answer:
        "Coaching focuses on helping individuals develop their own solutions and strategies, whereas mentoring involves providing guidance and advice based on the mentor's experience and expertise.",
    },
    {
      id: 3,
      question: "How often should I have coaching sessions ?",
      answer:
        "The frequency of coaching sessions depends on individual needs and goals. Typically, coaching sessions are held weekly or bi-weekly, but can be adjusted based on progress and requirements.",
    },
    {
      id: 4,
      question: "What should I expect from a coaching session ?",
      answer:
        "In a coaching session, you can expect to explore your goals and challenges, identify areas for improvement, and develop strategies for achieving success. Your coach will provide a supportive and non-judgmental space for you to reflect and grow.",
    },
    {
      id: 5,
      question: "How do I know if coaching is right for me ?",
      answer:
        "Coaching is right for you if you're willing to take an active role in your personal and professional development, are open to feedback and new ideas, and are committed to making positive changes in your life.",
    },
  ];
  const [show, setShow] = useState(1);

  return (
    <div className="space-y-5 w-full bg-white border-2 px-2 lg:px-4 rounded-lg py-3 my-9 m-auto">
      <h5 className="text-[30px] ">FAQ</h5>
      <div className="space-y-2">
        {faqs.map((faq, index) => {
          return (
            <button
              key={index}
              className=" md:px-3 block w-full text-xs hover:scale-[1.02] duration-300 md:text-xl"
            >
              <div
                onClick={() => {
                  setShow(faq.id == show ? 0 : faq.id);
                }}
                className={`bg-neutral-100 ${
                  faq.id == show ? "rounded-t-md" : "rounded-md "
                } border flex items-center justify-between py-2 px-3 `}
              >
                <p>{faq.question}</p>
                <IoIosArrowDown
                  className={`${
                    faq.id == show ? "-rotate-180" : "rotate-0"
                  } duration-300`}
                />
              </div>
              <div
                className={`${
                  faq.id == show
                    ? "h-fit py-5 visible rounded-b-md "
                    : "h-0 py-0 invisible rounded-md "
                } bg-neutral-100 duration-300 border flex items-center justify-between px-3 `}
              >
                <p
                  className={`${
                    faq.id == show ? "visible" : " invisible"
                  } text-start`}
                >
                  {faq.answer}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default FAQ;
