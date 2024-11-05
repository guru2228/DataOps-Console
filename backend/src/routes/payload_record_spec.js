const express = require('express');

const Payload_record_specService = require('../services/payload_record_spec');
const Payload_record_specDBApi = require('../db/api/payload_record_spec');
const wrapAsync = require('../helpers').wrapAsync;

const config = require('../config');

const router = express.Router();

const { parse } = require('json2csv');

const { checkCrudPermissions } = require('../middlewares/check-permissions');

router.use(checkCrudPermissions('payload_record_spec'));

/**
 *  @swagger
 *  components:
 *    schemas:
 *      Payload_record_spec:
 *        type: object
 *        properties:

 *          payload_record_spec_id:
 *            type: integer
 *            format: int64

 */

/**
 *  @swagger
 * tags:
 *   name: Payload_record_spec
 *   description: The Payload_record_spec managing API
 */

/**
 *  @swagger
 *  /api/payload_record_spec:
 *    post:
 *      security:
 *        - bearerAuth: []
 *      tags: [Payload_record_spec]
 *      summary: Add new item
 *      description: Add new item
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                data:
 *                  description: Data of the updated item
 *                  type: object
 *                  $ref: "#/components/schemas/Payload_record_spec"
 *      responses:
 *        200:
 *          description: The item was successfully added
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Payload_record_spec"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        405:
 *          description: Invalid input data
 *        500:
 *          description: Some server error
 */
router.post(
  '/',
  wrapAsync(async (req, res) => {
    const referer =
      req.headers.referer ||
      `${req.protocol}://${req.hostname}${req.originalUrl}`;
    const link = new URL(referer);
    await Payload_record_specService.create(
      req.body.data,
      req.currentUser,
      true,
      link.host,
    );
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 * @swagger
 * /api/budgets/bulk-import:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    tags: [Payload_record_spec]
 *    summary: Bulk import items
 *    description: Bulk import items
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *          properties:
 *            data:
 *              description: Data of the updated items
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/Payload_record_spec"
 *    responses:
 *      200:
 *        description: The items were successfully imported
 *    content:
 *      application/json:
 *        schema:
 *          $ref: "#/components/schemas/Payload_record_spec"
 *      401:
 *        $ref: "#/components/responses/UnauthorizedError"
 *      405:
 *        description: Invalid input data
 *      500:
 *        description: Some server error
 *
 */
router.post(
  '/bulk-import',
  wrapAsync(async (req, res) => {
    const referer =
      req.headers.referer ||
      `${req.protocol}://${req.hostname}${req.originalUrl}`;
    const link = new URL(referer);
    await Payload_record_specService.bulkImport(req, res, true, link.host);
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 *  @swagger
 *  /api/payload_record_spec/{id}:
 *    put:
 *      security:
 *        - bearerAuth: []
 *      tags: [Payload_record_spec]
 *      summary: Update the data of the selected item
 *      description: Update the data of the selected item
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Item ID to update
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        description: Set new item data
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                id:
 *                  description: ID of the updated item
 *                  type: string
 *                data:
 *                  description: Data of the updated item
 *                  type: object
 *                  $ref: "#/components/schemas/Payload_record_spec"
 *              required:
 *                - id
 *      responses:
 *        200:
 *          description: The item data was successfully updated
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Payload_record_spec"
 *        400:
 *          description: Invalid ID supplied
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Item not found
 *        500:
 *          description: Some server error
 */
router.put(
  '/:id',
  wrapAsync(async (req, res) => {
    await Payload_record_specService.update(
      req.body.data,
      req.body.id,
      req.currentUser,
    );
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 * @swagger
 *  /api/payload_record_spec/{id}:
 *    delete:
 *      security:
 *        - bearerAuth: []
 *      tags: [Payload_record_spec]
 *      summary: Delete the selected item
 *      description: Delete the selected item
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Item ID to delete
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: The item was successfully deleted
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Payload_record_spec"
 *        400:
 *          description: Invalid ID supplied
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Item not found
 *        500:
 *          description: Some server error
 */
router.delete(
  '/:id',
  wrapAsync(async (req, res) => {
    await Payload_record_specService.remove(req.params.id, req.currentUser);
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 *  @swagger
 *  /api/payload_record_spec/deleteByIds:
 *    post:
 *      security:
 *        - bearerAuth: []
 *      tags: [Payload_record_spec]
 *      summary: Delete the selected item list
 *      description: Delete the selected item list
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                ids:
 *                  description: IDs of the updated items
 *                  type: array
 *      responses:
 *        200:
 *          description: The items was successfully deleted
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Payload_record_spec"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Items not found
 *        500:
 *          description: Some server error
 */
router.post(
  '/deleteByIds',
  wrapAsync(async (req, res) => {
    await Payload_record_specService.deleteByIds(
      req.body.data,
      req.currentUser,
    );
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 *  @swagger
 *  /api/payload_record_spec:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Payload_record_spec]
 *      summary: Get all payload_record_spec
 *      description: Get all payload_record_spec
 *      responses:
 *        200:
 *          description: Payload_record_spec list successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Payload_record_spec"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Data not found
 *        500:
 *          description: Some server error
 */
router.get(
  '/',
  wrapAsync(async (req, res) => {
    const filetype = req.query.filetype;

    const globalAccess = req.currentUser.app_role.globalAccess;

    const payload = await Payload_record_specDBApi.findAll(
      req.query,
      globalAccess,
    );
    if (filetype && filetype === 'csv') {
      const fields = ['id', 'payload_record_spec_id'];
      const opts = { fields };
      try {
        const csv = parse(payload.rows, opts);
        res.status(200).attachment(csv);
        res.send(csv);
      } catch (err) {
        console.error(err);
      }
    } else {
      res.status(200).send(payload);
    }
  }),
);

/**
 *  @swagger
 *  /api/payload_record_spec/count:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Payload_record_spec]
 *      summary: Count all payload_record_spec
 *      description: Count all payload_record_spec
 *      responses:
 *        200:
 *          description: Payload_record_spec count successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Payload_record_spec"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Data not found
 *        500:
 *          description: Some server error
 */
router.get(
  '/count',
  wrapAsync(async (req, res) => {
    const globalAccess = req.currentUser.app_role.globalAccess;

    const payload = await Payload_record_specDBApi.findAll(
      req.query,
      globalAccess,
      { countOnly: true },
    );

    res.status(200).send(payload);
  }),
);

/**
 *  @swagger
 *  /api/payload_record_spec/autocomplete:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Payload_record_spec]
 *      summary: Find all payload_record_spec that match search criteria
 *      description: Find all payload_record_spec that match search criteria
 *      responses:
 *        200:
 *          description: Payload_record_spec list successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Payload_record_spec"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Data not found
 *        500:
 *          description: Some server error
 */
router.get('/autocomplete', async (req, res) => {
  const globalAccess = req.currentUser.app_role.globalAccess;

  const organizationId = req.currentUser.organization?.id;

  const payload = await Payload_record_specDBApi.findAllAutocomplete(
    req.query.query,
    req.query.limit,
    globalAccess,
    organizationId,
  );

  res.status(200).send(payload);
});

/**
 * @swagger
 *  /api/payload_record_spec/{id}:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Payload_record_spec]
 *      summary: Get selected item
 *      description: Get selected item
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID of item to get
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Selected item successfully received
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Payload_record_spec"
 *        400:
 *          description: Invalid ID supplied
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Item not found
 *        500:
 *          description: Some server error
 */
router.get(
  '/:id',
  wrapAsync(async (req, res) => {
    const payload = await Payload_record_specDBApi.findBy({
      id: req.params.id,
    });

    res.status(200).send(payload);
  }),
);

router.use('/', require('../helpers').commonErrorHandler);

module.exports = router;
