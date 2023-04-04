import * as React from "react";
import { Accordion, Container } from "react-bootstrap";

function FAQs() {
  return (
    <Container fluid style={styles.container}>
      <Accordion className="px-4">
        <Accordion.Item eventKey="0">
          <Accordion.Header>What is a TA?</Accordion.Header>
          <Accordion.Body>
            TA stands for "Teaching Assistant". A TA is a person who assists a
            teacher or professor in a course by helping with tasks such as
            grading, leading discussion sections, and answering student
            questions.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>How do I become a TA?</Accordion.Header>
          <Accordion.Body>
            Each class has its own set of requirements. However, the standard
            procedure is filling out an application. Then, if the hiring team
            likes you, you will have an interview and if that goes well, you're
            hired!
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Do TAs get paid?</Accordion.Header>
          <Accordion.Body>
            Yes! TAs do get paid. But you can also choose to TA for credit as
            well.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>How hard is it to be a TA?</Accordion.Header>
          <Accordion.Body>
            Each class has its own difficulty for being a TA. The lower level
            classes would be less difficult and the higher level classes would
            be more difficult just like it as a student.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>What classes can I be a TA for?</Accordion.Header>
          <Accordion.Body>
            You can technically be a TA for any class but we recommend applying
            to classes that you have taken and feel confident about the material
            in.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="5">
          <Accordion.Header>
            How long is the application process?
          </Accordion.Header>
          <Accordion.Body>
            Depending on the class, the timeline varies. Some classes have a
            quick turn around and other classes might take longer depending on
            how many TAs are chosen.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="6">
          <Accordion.Header>
            Who do I contact if I have any questions?
          </Accordion.Header>
          <Accordion.Body>
            You can reach out to the professor of a class using our messaging
            feature!
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}

export default FAQs;

const styles = {
  container: {
    minHeight: "75vh",
  }
};
