import React from 'react';
import { shallow, mount } from 'enzyme';
import { Lightbox } from '@momentum-ui/react-collaboration';

jest.mock('uuid', () => {
  return {
    v4: () => 'test-ID',
  };
});

describe('tests for <Lightbox />', () => {
  it('should match SnapShot', () => {
    const container = mount(
      <Lightbox
        applicationId="app"
        name="test"
        alt="test"
        height={100}
        width={100}
        pages={[
          {
            decrypting: true,
            image: 'testImage',
            thumb: 'testImage',
          },
        ]}
        onDownload={jest.fn()}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('when downloading is true the download button should turn to spinner', () => {
    const container = shallow(
      <Lightbox
        applicationId="app"
        name="test"
        height={100}
        width={100}
        downloading
        pages={[
          {
            decrypting: false,
            image: 'testImage',
            thumb: 'testImage',
          },
        ]}
        onDownload={jest.fn()}
      />
    );
    const downloadButton = container.find('.md-lightbox__download-button .icon-download_16');
    expect(downloadButton.length).toEqual(0);
    const spinner = container.find('Spinner');
    expect(spinner.length).toEqual(1);
  });

  it('when downloading is false the download button should be visible', () => {
    const container = shallow(
      <Lightbox
        applicationId="app"
        name="test"
        height={100}
        width={100}
        downloading={false}
        pages={[
          {
            decrypting: false,
            image: 'testImage',
            thumb: 'testImage',
          },
        ]}
        onDownload={jest.fn()}
      />
    );
    const downloadButton = container.find('.md-lightbox__control-download');
    expect(downloadButton.length).toEqual(1);
    const spinner = container.find('.md-lightbox__control-spinner');
    expect(spinner.length).toEqual(0);
  });

  it('appends className to image', () => {
    const className = 'new-class-name';
    const container = shallow(
      <Lightbox
        applicationId="app"
        name="test"
        height={100}
        imgClassName={className}
        width={100}
        info={{
          sharedBy: 'Shared by abcd',
          sharedOn: 'At 4/17/2018, 10:02 AM',
          size: '34.4 KB',
        }}
        pages={[
          {
            decrypting: false,
            image: 'testImage',
            thumb: 'testImage',
          },
        ]}
        onDownload={jest.fn()}
      />
    );
    const imageViewport = container.find('.md-lightbox__viewport-image');
    expect(imageViewport.length).toEqual(1);
    expect(imageViewport.prop('className')).toContain(className);
  });

  it('should display file meta data and name', () => {
    const container = shallow(
      <Lightbox
        applicationId="app"
        name="test"
        height={100}
        width={100}
        info={{
          sharedBy: 'Shared by abcd',
          sharedOn: 'At 4/17/2018, 10:02 AM',
          size: '34.4 KB',
        }}
        pages={[
          {
            decrypting: true,
            image: 'testImage',
            thumb: 'testImage',
          },
        ]}
        onDownload={jest.fn()}
      />
    );
    const sharedBy = container.find('.md-lightbox__header-sharer');
    const timestamp = container.find('.md-lightbox__header-timestamp');
    const name = container.find('.md-lightbox__header-name');
    expect(container.props()['aria-labelledby']).toStrictEqual(name.props().id);
    expect(name.type()).toEqual('h2');
    expect(name.text()).toEqual('test');
    expect(timestamp.text()).toEqual('At 4/17/2018, 10:02 AM');
    expect(sharedBy.text()).toEqual('Shared by abcd');
  });

  it('should change pages on click of next and previous', () => {
    const onChangeFn = jest.fn();
    const container = shallow(
      <Lightbox
        applicationId="app"
        name="test"
        height={100}
        width={100}
        info={{
          sharedBy: 'Shared by abcd',
          sharedOn: 'At 4/17/2018, 10:02 AM',
          size: '34.4 KB',
        }}
        pages={[
          {
            decrypting: true,
            image: 'testImage',
            thumb: 'testImage',
          },
          {
            decrypting: true,
            image: 'testImage',
            thumb: 'testImage',
          },
          {
            decrypting: true,
            image: 'testImage',
            thumb: 'testImage',
          },
        ]}
        index={1}
        onChange={onChangeFn}
        onDownload={jest.fn()}
      />
    );
    const rightControl = container.find('.md-lightbox__page-controls--right');
    const leftControl = container.find('.md-lightbox__page-controls--left');
    rightControl.simulate('click', { stopPropagation: () => {} });
    expect(onChangeFn).toHaveBeenCalledWith(2);
    leftControl.simulate('click', { stopPropagation: () => {} });
    expect(onChangeFn).toHaveBeenCalledWith(0);
  });

  it.each([true, false])('check scrollIntoViewIfNeeded and focus trigger when needFocus is %s', (needFocus) => {
    const onChangeFn = jest.fn();
    const container = shallow(<Lightbox
      applicationId="app"
      name="test"
      height={100}
      width={100}
      info={{
        sharedBy: 'Shared by abcd',
        sharedOn: 'At 4/17/2018, 10:02 AM',
        size: '34.4 KB',
      }}
      pages={[
        {
          decrypting: true,
          image: 'testImage',
          thumb: 'testImage',
        },
        {
          decrypting: true,
          image: 'testImage',
          thumb: 'testImage',
        },
      ]}
      onChange={onChangeFn}
      onDownload={jest.fn()}
    />);

    container.instance().lightBox = {
      querySelector: jest.fn().mockReturnValue({
        scrollIntoViewIfNeeded: jest.fn(),
        parentElement: {
          focus: jest.fn(),
        },
      }),
    };

    const index = 1;
    const mockEvent = { stopPropagation: jest.fn() };

    container.instance().triggerPageChange(index, mockEvent, needFocus);

    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(container.instance().lightBox.querySelector).toHaveBeenCalledWith(`[data-index="${index}"]`);
    expect(container.instance().lightBox.querySelector().scrollIntoViewIfNeeded).toHaveBeenCalled();
    if(needFocus){
      expect(container.instance().lightBox.querySelector().parentElement.focus).toHaveBeenCalled();
    } else {
      expect(container.instance().lightBox.querySelector().parentElement.focus).not.toHaveBeenCalled();
    }
  });

  it('should close the lightbox onClose', () => {
    const onCloseFn = jest.fn();
    const container = shallow(
      <Lightbox
        applicationId="app"
        name="test"
        height={100}
        width={100}
        info={{
          sharedBy: 'Shared by abcd',
          sharedOn: 'At 4/17/2018, 10:02 AM',
          size: '34.4 KB',
        }}
        pages={[
          {
            decrypting: true,
            image: 'testImage',
            thumb: 'testImage',
          },
        ]}
        onClose={onCloseFn}
        onDownload={jest.fn()}
      />
    );
    const closeIcon = container.find('.md-lightbox__header-item--right .md-lightbox__control');
    closeIcon.simulate('click');
    expect(onCloseFn).toHaveBeenCalled();
  });

  it('should zoom-in and zoom-out', () => {
    const container = shallow(
      <Lightbox
        applicationId="app"
        name="test"
        height={100}
        width={100}
        info={{
          sharedBy: 'Shared by abcd',
          sharedOn: 'At 4/17/2018, 10:02 AM',
          size: '34.4 KB',
        }}
        pages={[
          {
            decrypting: true,
            image: 'testImage',
            thumb: 'testImage',
          },
        ]}
        onDownload={jest.fn()}
      />
    );
    const zoomIn = container.find('.md-lightbox__viewer-controls .md-lightbox__control').at(1);
    const zoomOut = container.find('.md-lightbox__viewer-controls .md-lightbox__control').at(0);
    let zoomValue = container.find('.md-lightbox__controls .md-lightbox__control-value').at(0);
    expect(zoomValue.text()).toEqual('100%');
    zoomIn.simulate('click');
    zoomValue = container.find('.md-lightbox__controls .md-lightbox__control-value').at(0);
    expect(zoomValue.text()).toEqual('125%');
    zoomOut.simulate('click');
    zoomValue = container.find('.md-lightbox__controls .md-lightbox__control-value').at(0);
    expect(zoomValue.text()).toEqual('100%');
  });

  it('when content has only one page it should not display the content-list', () => {
    const container = shallow(
      <Lightbox
        applicationId="app"
        name="test"
        height={100}
        width={100}
        info={{
          sharedBy: 'Shared by abcd',
          sharedOn: 'At 4/17/2018, 10:02 AM',
          size: '34.4 KB',
        }}
        pages={[
          {
            decrypting: true,
            image: 'testImage',
            thumb: 'testImage',
          },
        ]}
        onDownload={jest.fn()}
      />
    );
    const contentList = container.find('.md-lightbox__list');
    expect(contentList.length).toEqual(0);
  });

  it('onDownload should be called when downloading the file', () => {
    const onDownloadFn = jest.fn();
    const container = shallow(
      <Lightbox
        applicationId="app"
        name="test"
        height={100}
        width={100}
        info={{
          sharedBy: 'Shared by abcd',
          sharedOn: 'At 4/17/2018, 10:02 AM',
          size: '34.4 KB',
        }}
        pages={[
          {
            decrypting: true,
            image: 'testImage',
            thumb: 'testImage',
          },
        ]}
        onDownload={onDownloadFn}
      />
    );
    const downloadIcon = container.find('.md-lightbox__control-download');
    downloadIcon.simulate('click');
    expect(onDownloadFn).toHaveBeenCalled();
  });

  it('when onDownload is undefined download button should not render', () => {
    const container = shallow(
      <Lightbox
        applicationId="app"
        name="test"
        height={100}
        width={100}
        downloading
        pages={[
          {
            decrypting: false,
            image: 'testImage',
            thumb: 'testImage',
          },
        ]}
      />
    );
    const downloadButton = container.find('.md-lightbox__download-button .icon-download_16');
    expect(downloadButton.length).toEqual(0);
    const spinner = container.find('Spinner');
    expect(spinner.length).toEqual(0);
  });

  it('should render theme provider as a wrapper inside the modal content', () => {
    const container = shallow(
      <Lightbox
        applicationId="app"
        name="test"
        height={100}
        width={100}
        theme="lightWebex"
        pages={[
          {
            decrypting: false,
            image: 'testImage',
            thumb: 'testImage',
          },
        ]}
      />
    );
    const themeProvider = container.find('ThemeProvider');
    expect(themeProvider.props()).toEqual({ theme: 'lightWebex', children: expect.any(Object) });
  });
});
