"use client";

import dynamic from "next/dynamic";
import { useState, useMemo, useRef, useActionState } from "react";
import { Badge, Button, Col, FormControl, FormControlFeedback, FormLabel, FormText, Row } from "react-bootstrap";

import { savePost } from '@/actions/posts';
import CustomCard from "@/components/CustomCard";

const JoditEditor = dynamic(() => import("jodit-react"), {
    ssr: false,
});

export default function EditForm({ post }) {
  const editor = useRef(null);
  const [title, setTitle] = useState(post?.title || "");
  const [tags, setTags] = useState(post?.tags?.join(" ") || "");
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [content, setContent] = useState(post?.content || "");
  const [state, action, isPending] = useActionState(savePost);

  const editorConfig = useMemo(() => ({
    readonly: false,
    placeholder: "Write your content here...",
    height: "600px",
  }), []);

  const slug = useMemo(() => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }, [title]);

  const tagsArray = useMemo(() => {
    return tags.trim().split(" ");
  }, [tags]);

  return (
    <CustomCard as="form" action={action} className="mt-3 mb-5 py-3">
      {{
        body: (
          <>
            <FormControl type="hidden" name="postId" value={post?._id} readOnly />
            <FormControl type="hidden" name="slug" value={slug} readOnly />
            <Row>
              <Col>
                <div className="mb-3">
                  <FormLabel htmlFor="title" className="form-label">
                    Title
                  </FormLabel>
                  <FormControl id="title" name="title" type="text" value={title} onChange={(event) => setTitle(event.target.value)} isInvalid={state?.errors?.title} />
                  {state?.errors?.title && (
                    <FormControl.Feedback type="invalid">
                      {state.errors.title}
                    </FormControl.Feedback>
                  )}
                  <FormText><b>generated slug</b>: {slug}</FormText>
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <FormLabel htmlFor="tags" className="form-label">
                    Tags
                  </FormLabel>
                  <FormControl type="text" id="tags" name="tags" value={tags} onChange={(event) => {setTags(event.target.value)}} />
                  <FormText className="mt-1 d-flex justify-content-end">
                    {tagsArray.map((tag, index) => (
                      <Badge key={index} bg="secondary" className="me-1">
                        {tag}
                      </Badge>
                    ))}
                  </FormText>
                </div>
              </Col>
            </Row>

            <div className="mb-3">
              <FormLabel htmlFor="excerpt" className="form-label">
                Exerpt
              </FormLabel>
              <FormControl
                id="excerpt"
                name="excerpt"
                as="textarea"
                rows={3}
                value={excerpt}
                isInvalid={state?.errors?.exerpt}
                onChange={(event) => setExcerpt(event.target.value)}
              />
              {state?.errors?.excerpt && (
                <FormControl.Feedback type="invalid">
                  {state.errors.excerpt}
                </FormControl.Feedback>
              )}
            </div>

            <div className="mb-3">
              <FormLabel className="visually-hidden" htmlFor="content">Content</FormLabel>
              <JoditEditor
                ref={editor}
                id="content"
                name="content"
                value={content}
                config={editorConfig}
                onChange={(newContent) => setContent(newContent)}
              />
            </div>
            <div className="d-flex">
              <Button
                type="submit"
                variant="primary"
                className="ms-auto px-5"
                disabled={isPending}
              >
                {post ? "Update" : "Save"}
              </Button>
            </div>
          </>
        )
      }}
    </CustomCard>
  );
}