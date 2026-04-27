import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class EventServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        String ename = request.getParameter("ename");
        String date = request.getParameter("date");
        String location = request.getParameter("location");
        String organizer = request.getParameter("organizer");

        out.println("<h2>Event Details</h2>");
        out.println("<table border='1'>");
        
        out.println("<tr><td>Event Name</td><td>" + ename + "</td></tr>");
        out.println("<tr><td>Date</td><td>" + date + "</td></tr>");
        out.println("<tr><td>Location</td><td>" + location + "</td></tr>");
        out.println("<tr><td>Organizer</td><td>" + organizer + "</td></tr>");
        
        out.println("</table>");
        out.println("<hr><p>@24071A05K8</p>");
    }
}