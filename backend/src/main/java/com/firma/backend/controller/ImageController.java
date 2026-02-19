package com.firma.backend.controller;

import com.mongodb.client.gridfs.model.GridFSFile;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
public class ImageController {

    private final GridFsTemplate gridFsTemplate;

    /**
     * GET /api/images/{id}
     *
     * Serves an image stored in GridFS.
     * The {id} must be the hex string of the GridFS ObjectId.
     */
    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable String id) {
        try {
            ObjectId objectId = new ObjectId(id);
            GridFSFile file = gridFsTemplate.findOne(query(where("_id").is(objectId)));
            if (file == null) {
                return ResponseEntity.notFound().build();
            }

            var resource = gridFsTemplate.getResource(file);
            String contentType = (file.getMetadata() != null && file.getMetadata().getString("_contentType") != null)
                    ? file.getMetadata().getString("_contentType")
                    : "application/octet-stream";

            byte[] bytes = resource.getInputStream().readAllBytes();

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + file.getFilename() + "\"")
                    .header(HttpHeaders.CACHE_CONTROL, "public, max-age=31536000, immutable")
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(bytes);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
