export async function listLogEntries() {
  const response = await fetch("/logs");
  return response.json();
}

export async function createLogEntry(entry) {
  console.log({ entry });
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
