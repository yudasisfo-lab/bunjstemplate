import { render } from "../config/viewEngine";
//import * as model from "../models/mahasiswaModel"; // ganti dengan prisma
import prisma from "../config/prisma";


// LIST
// export const index = async (c) => {
//   const data = model.getAll();

//   const success = c.req.query("success");
//   const error = c.req.query("error");

//   return c.html(
//     await render("mahasiswa/index", {
//       title: "Data Mahasiswa",
//       mahasiswa: data,
//       success,
//       error,
//     }, c)
//   );
// };

// LIST
export const index = async (c) => {
  const data = await prisma.mahasiswa.findMany();

  return c.html(
    await render("mahasiswa/index", {
      title: "Data Mahasiswa",
      mahasiswa: data,
      success: c.req.query("success"),
      error: c.req.query("error"),
    }, c)
  );
};



// FORM CREATE
// export const createForm = async (c) => {
//   return c.html(
//     await render("mahasiswa/create", {
//       title: "Tambah Mahasiswa",
//     }, c)
//   );
// };

// CREATE FORM
export const createForm = async (c) => {
  return c.html(await render("mahasiswa/create", {
    title: "Tambah Mahasiswa",
  }, c));
};


// STORE
// export const store = async (c) => {
//   const body = await c.req.parseBody();

//   // VALIDASI
//   if (!body.nama || !body.nim) {
//     return c.redirect("/mahasiswa/create?error=Semua field wajib diisi");
//   }

//   model.create({
//     nama: body.nama,
//     nim: body.nim,
//   });

//   return c.redirect("/mahasiswa?success=Data berhasil ditambahkan");
// };

// STORE
export const store = async (c) => {
  const body = await c.req.parseBody();

  if (!body.nama || !body.nim) {
    return c.redirect("/mahasiswa/create?error=Field wajib diisi");
  }

  try {
    await prisma.mahasiswa.create({
      data: {
        nama: body.nama,
        nim: body.nim,
      },
    });

    return c.redirect("/mahasiswa?success=Data berhasil ditambah");
  } catch (err) {
    return c.redirect("/mahasiswa/create?error=NIM sudah digunakan");
  }
};

// FORM EDIT
// export const editForm = async (c) => {
//   const id = c.req.param("id");
//   const data = model.getById(id);

//   return c.html(
//     await render("mahasiswa/edit", {
//       title: "Edit Mahasiswa",
//       mhs: data,
//     }, c)
//   );
// };

// EDIT FORM
export const editForm = async (c) => {
  const id = Number(c.req.param("id"));

  const data = await prisma.mahasiswa.findUnique({
    where: { id },
  });

  return c.html(await render("mahasiswa/edit", {
    title: "Edit Mahasiswa",
    mhs: data,
  }, c));
};

// UPDATE
// export const updateData = async (c) => {
//   const id = c.req.param("id");
//   const body = await c.req.parseBody();

//   if (!body.nama || !body.nim) {
//     return c.redirect(`/mahasiswa/edit/${id}?error=Field tidak boleh kosong`);
//   }

//   model.update(id, {
//     nama: body.nama,
//     nim: body.nim,
//   });

//   return c.redirect("/mahasiswa?success=Data berhasil diupdate");
// };

// UPDATE
export const updateData = async (c) => {
  const id = Number(c.req.param("id"));
  const body = await c.req.parseBody();

  try {
    await prisma.mahasiswa.update({
      where: { id },
      data: {
        nama: body.nama,
        nim: body.nim,
      },
    });

    return c.redirect("/mahasiswa?success=Data berhasil diupdate");
  } catch (err) {
    return c.redirect(`/mahasiswa/edit/${id}?error=Gagal update`);
  }
};


// DELETE
// export const destroy = async (c) => {
//   const id = c.req.param("id");

//   model.remove(id);

//   return c.redirect("/mahasiswa?success=Data berhasil dihapus");
// };

// DELETE
export const destroy = async (c) => {
  const id = Number(c.req.param("id"));

  await prisma.mahasiswa.delete({
    where: { id },
  });

  return c.redirect("/mahasiswa?success=Data berhasil dihapus");
};