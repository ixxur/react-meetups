import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a huge list of highly active react meetups" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

// export const getServerSideProps = async(context) => {
//     const req = context.req;
//     const res = context.res;

//     // fetch data from an api/db
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export const getStaticProps = async () => {
  // fetch data from an api/db
  const client = MongoClient.connect(
    "mongodb+srv://ruxio2000:7czCGPYqRCom2oZU@cluster0.4ms0hf0.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = (await client).db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  (await client).close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1, //o secunda
  };
};

export default HomePage;
