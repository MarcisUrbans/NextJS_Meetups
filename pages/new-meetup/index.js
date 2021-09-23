import { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetupPage() {
  const router = useRouter();
  async function addMeetupHandler(enteredMeetupData) {
    console.log(enteredMeetupData);
    // iekš api foldera noteiktais fails.
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    router.push("/");
  }
  return (
    <Fragment>
      <Head>
        <title>Add new meetup</title>
        <meta
          name="new-meetup"
          content="Add your own meetups. amazing networking opportunities"
        ></meta>
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}

export default NewMeetupPage;
