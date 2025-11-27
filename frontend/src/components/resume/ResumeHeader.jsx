import React from "react";

export default function ResumeHeader(props) {
  const person = props.person;
  return (
    <section className="header">
      <h1>{person.name}</h1>
      <p>
        <span
          className="address"
          dangerouslySetInnerHTML={{ __html: person.address }}
        />
        <span className="bull">&bull;</span>
        <span className="email">
          <a href={`mailto:${person.email}`}>{person.email}</a>
        </span>
        <span className="bull">&bull;</span>
        <span className="phone">{person.phone}</span>
      </p>
    </section>
  );
}
