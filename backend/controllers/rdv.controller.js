import {
  createRdv,
  getRdvById,
  updateRdv,
  deleteRdv,
  getAllRdvs,
} from "../models/rdv.model.js";

export const createRdvController = async (req, res, next) => {
  try {
    const { nom, prenom, telephone, date_rdv } = req.body;
    const id = await createRdv(nom, prenom, telephone, date_rdv);
    console.log(`[CREATE] rdv céé -ID: ${id}`);
    res.status(201).json({
      success: true,
      message: "rdv ajouter avec succés",
      id,
    });
  } catch (error) {
    next(error);
  }
};

export const getRdvByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rdv = await getRdvById(id);

    if (!rdv) {
      console.log(`[GET_BY_ID] RDV ${id} non trouve`);
      return res.status(404).json({
        success: false,
        message: "rdv non trouvé",
      });
    }
    console.log(`[GET_BY_ID] rdv ${id} récupéré`);
    res.status(200).json({
      success: true,
      data: rdv,
    });
  } catch (error) {
    next(error);
  }
};

export const updateRdvController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nom, prenom, telephone, date_rdv } = req.body;

    // plus de validation ici, c'est dans validators
    await updateRdv(id, { nom, prenom, telephone, date_rdv });

    console.log(`[UPDATE] rdv ${id} mis à jour`);
    res.status(200).json({
      success: true,
      message: "rdv mis à jour avec succès",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteRdvController = async (req, res, next) => {
  try {
    const { id } = req.params;

    // plus de validation ici, c'est dans validators
    await deleteRdv(id);

    console.log(`[DELETE] rdv ${id} supprimé`);
    res.status(200).json({
      success: true,
      message: "rdv supprimé avec succès",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllRdvsController = async (req, res, next) => {
  try {
    const all = await getAllRdvs();
    console.log("[GET_ALL] rdv list récupérée", all.length);
    res.status(200).json({
      success: true,
      data: all,
    });
  } catch (error) {
    next(error);
  }
};
