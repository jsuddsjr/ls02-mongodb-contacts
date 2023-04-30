import {Router} from 'express'
import contacts from '../controllers/contacts.js'

const router = new Router()

/**
 * @swagger
 * definitions:
 *   Contact:
 *     type: object
 *     required:
 *     - firstName
 *     - lastName
 *     - email
 *     - favoriteColor
 *     - birthday
 *     properties:
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       email:
 *         type: string
 *       favoriteColor:
 *         type: string
 *       birthday:
 *         type: string
 *     example:
 *       firstName: Easter
 *       lastName: Bunny
 *       email: cotton.tail@bouncy-house.com
 *       favoriteColor: hot pink
 *       birthday: 1970-04-01
 */

/**
 * @swagger
 * /contacts:
 *   get:
 *     description: Get all contacts
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Contact'
 *       500:
 *         description: Internal Server Error
 */
router.get('/', contacts.getAll)

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     description: Get a single contact
 *     parameters:
 *     - name: id
 *       description: Contact's id
 *       in: path
 *       required: true
 *       schema:
 *         type: string
 *     responses:
 *        200:
 *          description: Success
 *          type: object
 *          schema:
 *            $ref: '#/definitions/Contact'
 *        400:
 *          description: Bad request
 *        404:
 *          description: Not found
 *        500:
 *          description: Internal Server Error
 */
router.get('/:id', contacts.getSingle)

/**
 * @swagger
 * /contacts:
 *   post:
 *     description: Create a new contact
 *     parameters:
 *     - name: contact
 *       description: Contact object
 *       in: body
 *       required: true
 *       schema:
 *         $ref: '#/definitions/Contact'
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal Server Error
 */
router.post('/', contacts.postSingle)

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *    description: Update a single contact
 *    parameters:
 *    - name: id
 *      description: Contact's id
 *      in: path
 *      required: true
 *      schema:
 *        type: string
 *    - name: contact
 *      description: Contact object
 *      in: body
 *      required: true
 *      schema:
 *        $ref: '#/definitions/Contact'
 *    responses:
 *      200:
 *        description: Success
 *        type: object
 *        schema:
 *          $ref: '#/definitions/Contact'
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal Server Error
 */
router.put('/:id', contacts.putSingle)

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     description: Delete a single contact
 *     parameters:
 *     - name: id
 *       description: Contact's id
 *       in: path
 *       required: true
 *       schema:
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 */
router.delete('/:id', contacts.deleteSingle)

export default router
