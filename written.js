import { role } from "./model/role.model.js";

async function seedData() {
  const user1 = await role.create({
    authentication: "Admin",
  });

  const user2 = await role.create({
    authentication: "NormalUser",
  });

  const user3 = await role.create({
    authentication: "SuperUser",
  });
}

export { seedData };
