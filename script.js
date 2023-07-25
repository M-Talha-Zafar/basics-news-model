function createUser(name) {
  return {
    name: name,
    update: function (message) {
      console.log(`${this.name} received a notification: ${message}`);
    },
  };
}

function createNewsPublisher() {
  const subscribers = [];

  function subscribe(user) {
    subscribers.push(user);
  }

  function unsubscribe(user) {
    const index = subscribers.indexOf(user);
    if (index !== -1) {
      subscribers.splice(index, 1);
    }
  }

  function publishUpdate(updateMessage) {
    console.log(`New update published: ${updateMessage}`);
    notifySubscribers(updateMessage);
  }

  function notifySubscribers(message) {
    subscribers.forEach((subscriber) => subscriber.update(message));
  }

  return {
    subscribe,
    unsubscribe,
    publishUpdate,
  };
}

const newsPublisher = createNewsPublisher();

const user1 = createUser("John");
const user2 = createUser("Alice");
const user3 = createUser("Bob");

newsPublisher.subscribe(user1);
newsPublisher.subscribe(user2);
newsPublisher.subscribe(user3);

newsPublisher.publishUpdate("New article published!");

newsPublisher.unsubscribe(user2);

newsPublisher.publishUpdate("Important announcement!");
