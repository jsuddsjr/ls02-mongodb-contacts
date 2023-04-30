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
 *   ContactArray:
 *     type: array
 *     items:
 *       $ref: '#/definitions/Contact'
 *   ContactId:
 *     type: string
 *     length: 24
 *   ContactIdResponse:
 *     type: object
 *     properties:
 *       _id:
 *         $ref: '#/definitions/ContactId'
 *   ErrorMessage:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 */

/**
 * @swagger
 * /contacts:
 *   get:
 *     description: Get all contacts
 *     responses:
 *       200:
 *         description: Success
 *         type: object
 *         schema:
 *           $ref: '#/definitions/ContactArray'
 *       500:
 *         description: Internal Server Error
 *         type: object
 *         schema:
 *           $ref: '#/definitions/ErrorMessage'
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
 *         $ref: '#/definitions/ContactId'
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
 *          type: object
 *          schema:
 *            $ref: '#/definitions/ErrorMessage'
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
 *         type: object
 *         schema:
 *           $ref: '#/definitions/ContactIdResponse'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal Server Error
 *         type: object
 *         schema:
 *           $ref: '#/definitions/ErrorMessage'
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
 *        $ref: '#/definitions/ContactId'
 *    - name: contact
 *      description: Contact object
 *      in: body
 *      required: true
 *      schema:
 *        $ref: '#/definitions/Contact'
 *    responses:
 *      204:
 *        description: Success
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal Server Error
 *        type: object
 *        schema:
 *          $ref: '#/definitions/ErrorMessage'
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
 *         $ref: '#/definitions/ContactId'
 *     responses:
 *       200:
 *         description: Success
 *         type: object
 *         schema:
 *           $ref: '#/definitions/ErrorMessage'
 *       400:
 *         description: Bad request
 */
router.delete('/:id', contacts.deleteSingle)

export default router
