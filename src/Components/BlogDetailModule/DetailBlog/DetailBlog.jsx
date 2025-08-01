"use client";
import { blogData } from "@/static/static";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const DetailBlog = ({ route }) => {
  const [getData, setGetData] = useState(null);

  useEffect(() => {
    if (route) {
      const match = blogData.find((item) => item.url === route);
      if (match) setGetData(match);
    }
  }, [route]);
  return (
    <section className="">
      <Container>
        <Row>
          <Col lg={12}>{getData?.title}</Col>
        </Row>
      </Container>
    </section>
  );
};

export default DetailBlog;
