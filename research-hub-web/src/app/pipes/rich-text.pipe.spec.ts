import { RichTextToHTML } from "./rich-text.pipe";

describe('List item to router link : pipe', () => {
    let pipe: RichTextToHTML;

    beforeEach(() => {
        pipe = new RichTextToHTML();
    });

    const mockRichText = {
        "nodeType": "document",
        "data": {},
        "content": [
            {
                "nodeType": "heading-2",
                "content": [
                    {
                        "nodeType": "text",
                        "value": "Welcome to the Hub",
                        "marks": [],
                        "data": {}
                    }
                ],
                "data": {}
            },
            {
                "nodeType": "paragraph",
                "content": [
                    {
                        "nodeType": "text",
                        "value": "This is the first article. Sam's writing some random text here to pad out space.",
                        "marks": [],
                        "data": {}
                    }
                ],
                "data": {}
            },
            {
                "nodeType": "heading-3",
                "content": [
                    {
                        "nodeType": "text",
                        "value": "Smaller Heading",
                        "marks": [],
                        "data": {}
                    }
                ],
                "data": {}
            },
            {
                "nodeType": "paragraph",
                "content": [
                    {
                        "nodeType": "text",
                        "value": "I'm just testing how the HTML rendering works.",
                        "marks": [],
                        "data": {}
                    }
                ],
                "data": {}
            },
            {
                "nodeType": "unordered-list",
                "content": [
                    {
                        "nodeType": "list-item",
                        "content": [
                            {
                                "nodeType": "paragraph",
                                "content": [
                                    {
                                        "nodeType": "text",
                                        "value": "I'm just testing how a bullet point list works.",
                                        "marks": [],
                                        "data": {}
                                    }
                                ],
                                "data": {}
                            }
                        ],
                        "data": {}
                    },
                    {
                        "nodeType": "list-item",
                        "content": [
                            {
                                "nodeType": "paragraph",
                                "content": [
                                    {
                                        "nodeType": "text",
                                        "value": "Wow, it has bullets.",
                                        "marks": [],
                                        "data": {}
                                    }
                                ],
                                "data": {}
                            }
                        ],
                        "data": {}
                    },
                    {
                        "nodeType": "list-item",
                        "content": [
                            {
                                "nodeType": "paragraph",
                                "content": [
                                    {
                                        "nodeType": "text",
                                        "value": "Run out of generic text ",
                                        "marks": [],
                                        "data": {}
                                    },
                                    {
                                        "nodeType": "text",
                                        "value": "ideas ",
                                        "marks": [
                                            {
                                                "type": "italic"
                                            }
                                        ],
                                        "data": {}
                                    },
                                    {
                                        "nodeType": "text",
                                        "value": "so I'll stop now.",
                                        "marks": [],
                                        "data": {}
                                    }
                                ],
                                "data": {}
                            }
                        ],
                        "data": {}
                    }
                ],
                "data": {}
            },
            {
                "nodeType": "heading-4",
                "content": [
                    {
                        "nodeType": "text",
                        "value": "An Even Smaller Heading",
                        "marks": [],
                        "data": {}
                    }
                ],
                "data": {}
            },
            {
                "nodeType": "paragraph",
                "content": [
                    {
                        "nodeType": "text",
                        "value": "Last thing I'll check is how a link works, have you heard of ",
                        "marks": [],
                        "data": {}
                    },
                    {
                        "nodeType": "hyperlink",
                        "content": [
                            {
                                "nodeType": "text",
                                "value": "Google",
                                "marks": [],
                                "data": {}
                            }
                        ],
                        "data": {
                            "uri": "https://google.com/"
                        }
                    },
                    {
                        "nodeType": "text",
                        "value": "?",
                        "marks": [],
                        "data": {}
                    }
                ],
                "data": {}
            },
            {
                "nodeType": "paragraph",
                "content": [
                    {
                        "nodeType": "text",
                        "value": "",
                        "marks": [],
                        "data": {}
                    }
                ],
                "data": {}
            }
        ]
    };

    const expectedHtmlOutput = '<h2>Welcome to the Hub</h2><p>This is the first article. Sam&#39;s writing some random text here to pad out space.</p><h3>Smaller Heading</h3><p>I&#39;m just testing how the HTML rendering works.</p><ul><li><p>I&#39;m just testing how a bullet point list works.</p></li><li><p>Wow, it has bullets.</p></li><li><p>Run out of generic text <i>ideas </i>so I&#39;ll stop now.</p></li></ul><h4>An Even Smaller Heading</h4><p>Last thing I&#39;ll check is how a link works, have you heard of <a href="https://google.com/">Google</a>?</p><p></p>';

    it('Should return expected HTML', () => {
        expect(pipe.transform(mockRichText)).toEqual(expectedHtmlOutput);
    });
});