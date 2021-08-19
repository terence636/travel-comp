
export async function listLogEntries(username) {
  console.log("listLog")
  const response = await fetch("/logs");
  return response.json();
}

export async function createLogEntry(entry,username) {
  console.log({ entry });
  entry.username = username
  try {
    const response = await fetch("/logs", {
      method: "POST",
      body: JSON.stringify(entry),
      headers: {
        "content-type": "application/json",
      },
    });
    const logCreated = response.json();
    console.log({ logCreated });
    return logCreated;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteLogEntry(entry) {
    console.log({ entry });
    try {
      const response = await fetch(`/logs/${entry._id}`, {
        method: "DELETE",
      });
      const logDeleted = response.json();
      console.log({logDeleted})
      return logDeleted;
    } catch (err) {
      console.log(err);
    }
  }
