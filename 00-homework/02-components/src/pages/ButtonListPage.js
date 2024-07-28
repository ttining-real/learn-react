import { createElement as h } from 'https://esm.sh/react';
import Button from '../components/Button.js';

function ButtonListPage() {
  return h(
    'ul',
    {
      className: 'ButtonList',
      'aria-label': '크기/상태별 버튼'
    },
    h(
      'li',
      { 
        className: 'ButtonListItem',
        'aria-label': '작은 크기의 상태별 버튼'
      },
      h(
        Button,
        { status: 'default', size: 'sm', text: '보기' }
      ),
      h(
        Button,
        { status: 'positive', size: 'sm', text: '확인' }
      ),
      h(
        Button,
        { status: 'negative', size: 'sm', text: '삭제' }
      ),
    ),
    h(
      'li',
      { 
        className: 'ButtonListItem',
        'aria-label': '중간 크기의 상태별 버튼'
      },
      h(
        Button,
        { status: 'default', size: 'md', text: '보기' }
      ),
      h(
        Button,
        { status: 'positive', size: 'md', text: '확인' }
      ),
      h(
        Button,
        { status: 'negative', size: 'md', text: '삭제' }
      ),
    ),
    h(
      'li',
      { 
        className: 'ButtonListItem',
        'aria-label': '큰 크기의 상태별 버튼'
      },
      h(
        Button,
        { status: 'default', size: 'lg', text: '보기' }
      ),
      h(
        Button,
        { status: 'positive', size: 'lg', text: '확인' }
      ),
      h(
        Button,
        { status: 'negative', size: 'lg', text: '삭제' }
      ),
    ),
  );
}

export default ButtonListPage;
