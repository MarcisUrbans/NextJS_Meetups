import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta
          name="current meetup"
          content={props.meetupData.description}
        ></meta>
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        description={props.meetupData.description}
        address={props.meetupData.address}
      ></MeetupDetail>
    </Fragment>
  );
}
export async function getStaticPaths() {
  MongoClient.connect();
  const client = await MongoClient.connect(
    "mongodb+srv://Murbans:kriitinjsh@nextjsfree.f9bm9.mongodb.net/nextJSFree?retryWrites=true&w=majority"
  );
  const db = client.db();
  const mettupsCollection = db.collection("meetups");

  const meetups = await mettupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false, // ja false, tad viss, kas man ir pieejams ir norādīts pathā. Ja true, tad daļa ir norādīta, daļa nav.
    paths: meetups.map((el) => ({ params: { meetupId: el._id.toString() } })),
  };
}
export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://Murbans:kriitinjsh@nextjsfree.f9bm9.mongodb.net/nextJSFree?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  console.log(selectedMeetup);
  client.close();
  //fetch data for single meetup
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        image: selectedMeetup.image,
        title: selectedMeetup.title,
        description: selectedMeetup.description,
        address: selectedMeetup.address,
      },
    },
  };
}

export default MeetupDetails;
