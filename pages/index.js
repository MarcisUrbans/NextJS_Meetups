import { Fragment } from "react";
import { MongoClient } from "mongodb";
import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
  // const [loadedMeetups, setLoadedMeetups] = useState([]);
  // useEffect(() => {
  //   // send http request and fetch data
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // }, []);
  return (
    <Fragment>
      <Head>
        <title>React meetups Marcis</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        ></meta>
      </Head>
      <MeetupList meetups={props.meetups}></MeetupList>
    </Fragment>
  );
}

// Strādā tikai ar komponentēm, kuras ir iekš pages foldera!!!!
// executed during build process. Servera pusē! Nekad klienta pusē nenostrādās.

export async function getStaticProps() {
  // fetch data from api

  MongoClient.connect();
  const client = await MongoClient.connect(
    "mongodb+srv://Murbans:kriitinjsh@nextjsfree.f9bm9.mongodb.net/nextJSFree?retryWrites=true&w=majority"
  );
  const db = client.db();
  const mettupsCollection = db.collection("meetups");

  const meetups = await mettupsCollection.find().toArray();

  client.close();

  // vienmēr jāatgriež objekts, kurš satur props. Home page vienmēr to sanņems
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    // cik sekundes gaidīs, lai iegūtu jaunos datus. Prasīs serverim ik pa 10 sec, ja ir requesti šai lapai.
    revalidate: 10,
  };
}

// Mainās uz katru pieprasījumu lapai.
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from api
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export default HomePage;
