{{if type === 'doc' || type === 'docx'}}
<div id="btn-type-info" class="report-type-info">Word文档预览</div>
{{else if type === 'ppt' || type === 'pptx'}}
<div id="btn-type-info" class="report-type-info">Ppt文档预览</div>
{{else if type === 'pdf'}}
<div id="btn-type-info" class="report-type-info">Pdf文档预览</div>
{{/if}}
<!--<div class="report-preview">-->
    <!--{{each preview}}-->
    <!--<img src="{{$value}}">-->
    <!--{{/each}}-->
<!--</div>-->
<div class="report-preview">
    <iframe src="{{preview}}" id="ifr-container"></iframe>
</div>
