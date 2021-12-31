import { useState, useEffect } from "react";
import MeetupList from "../components/meetups/MeetupList";

// Used this dummy data to render something on the page before we added api
// const DUMMY_DATA = [
//   {
//     id: "m1",
//     title: "This is a first meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg",
//     address: "Meetupstreet 5, 12345 Meetup City",
//     description: "This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!"
//   },
//   {
//     id: "m2",
//     title: "This is a second meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg",
//     address: "Meetupstreet 5, 12345 Meetup City",
//     description: "This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!"
//   }
// ];

function AllMeetupsPage() {
  // add a loading state
  const [isLoading, setIsLoading] = useState(true);
  // for when we get the data back
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  // useEffect needed to not create an infinite loop with fetch>state changes>rerender>fetch again>etc
  useEffect(() => {
    setIsLoading(true); // this is added just to be cleaner
    fetch("https://meetup-react-app-b3f39-default-rtdb.firebaseio.com/meetups.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // data from firebase is an object and we need an array so we transform the data after we receive it
        const meetups = [];
        // key = the keys from the object in Firebase
        // for every meetup key in firebase:
        for (const key in data) {
          const meetup = {
            id: key,
            ...data[key]
          };
          meetups.push(meetup);
        }
        // if there's data, set isLoading to false bc it's not in a loading state
        setIsLoading(false);
        setLoadedMeetups(meetups);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }
  return (
    <div>
      <h1>All Meetups</h1>
      <MeetupList meetups={loadedMeetups} />
    </div>
  );
}

export default AllMeetupsPage;
