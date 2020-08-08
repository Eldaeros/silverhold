import React, { useState, useEffect, useContext } from 'react';
import posts, { Post } from '../data/blog-posts';
import { Container } from '@material-ui/core';
import RhythmImage from './Image';
import styled, { css } from 'styled-components';
import RhythmCodeBlock from './CodeBlock';

import { useTypography } from '../libs/useTypography';

interface BlogPostProps {
    meta: Omit<Post, 'path'>;
    children: JSX.Element | JSX.Element[];
}
const BlogPost = (props: BlogPostProps) => {
    const current = posts.map(({ title }) => title).indexOf(props.meta.title);
    const next = posts[current - 1];
    const prev = posts[current + 1];

    const [children, setChildren] = useState(props.children);
    useEffect(() => {
        let children = Array.isArray(props.children)
            ? props.children
            : [props.children];
        children = childrenMapping(children);
        setChildren(children);
    }, []);

    const typography = useTypography();

    const debugMode = false;
    const BlogContainer = styled(Container)`
        ${debugMode
            ? `background-position: -1px -1px;
        background-image: linear-gradient(
            rgba(50, 50, 100, 0.25) 1px,
            transparent 1px
        );
        background-size: 1px ${typography.rhythmHeight(1)};`
            : ``}

        p {
            ${typography.verticalRhythm({ fontScale: 2 })}

            code {
                ${typography.verticalRhythm({ fontScale: 1 })}
                display: inline-block;
                margin-bottom: 0px;
            }
        }

        pre {
            min-height: ${typography.rhythmHeight(2)};
            background-color: lightgray;
            overflow: hidden;
            margin: ${typography.rhythmHeight(0.5)} 0;
            box-sizing: content-box;
            code {
                ${typography.verticalRhythm({
                    fontScale: 1
                })}
                margin: 0;
                margin-left: ${typography.rhythmHeight(1)};
                padding: ${typography.rhythmHeight(0.5)} 0;
                display: inline-block;
                position: absolute;
            }
        }

        a {
            ${typography.verticalRhythm({ fontScale: 2 })}
        }

        ul {
            ${typography.verticalRhythm({ fontScale: 2 })}
            margin-top: 0;
            margin-bottom: ${typography.rhythmHeight(1)};

            li {
                ${typography.verticalRhythm({ fontScale: 2 })}
                margin: 0;
            }
        }

        ol {
            ${typography.verticalRhythm({ fontScale: 2 })}
        }

        blockquote {
            ${typography.verticalRhythm({ fontScale: 2 })}
            & > * {
                margin-left: ${typography.rhythmHeight(1)};
            }
        }

        pre {
            line-height: calc(1.85 * ${typography.rhythm.getBaseFontSize()}em);
            margin: 0px;
        }

        img {
            width: 100%;
        }

        h1 {
            ${typography.verticalRhythm({ fontScale: 6 })}
        }
        h2 {
            ${typography.verticalRhythm({ fontScale: 5 })}
        }
        h3 {
            ${typography.verticalRhythm({ fontScale: 4 })}
        }
        h4 {
            ${typography.verticalRhythm({ fontScale: 3 })}
        }
        h5 {
            ${typography.verticalRhythm({ fontScale: 2 })}
        }
        h6 {
            ${typography.verticalRhythm({ fontScale: 1 })}
        }
    `;

    return (
        <>
            <BlogContainer maxWidth="md">
                <h1>{props.meta.title}</h1>
                {children}
                <hr />
                <div>
                    <div>
                        {prev && (
                            <PostNavigation
                                href={prev.path}
                                position="< Previous post"
                                title={prev.title}
                            />
                        )}
                    </div>
                    <div>
                        {next && (
                            <PostNavigation
                                href={next.path}
                                position="Next post >"
                                title={next.title}
                            />
                        )}
                    </div>
                </div>
            </BlogContainer>
        </>
    );
};

const childrenMapping = (children: any, level: number = 0) => {
    return children.map((child, i) => {
        const descendants = child?.props?.children;
        if (descendants?.props?.mdxType === 'img') {
            child = <RhythmImage key={i} src={descendants.props.src} />;
        } else if (child?.props?.mdxType === 'pre') {
            child = <RhythmCodeBlock key={i}>{child}</RhythmCodeBlock>;
        }
        return child;
    });
};

interface PostNavigationProps {
    href: string;
    position: string;
    title: string;
}
const PostNavigation = (props: PostNavigationProps) => (
    <a href={props.href}>
        {props.position}{' '}
        {/* <Typography variant={'subtitle1'} component="h4">
            {props.title}
        </Typography> */}
    </a>
);

export default BlogPost;
