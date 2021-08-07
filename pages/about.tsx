const About = ({ data }) => {
  return <h1>{data}</h1>;
};

export const getServerSideProps = () => {
  return {
    props: {
      data: 'Hello world 2',
    },
  };
};

export default About;
